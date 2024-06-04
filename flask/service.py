import os
from flask import Flask, request, jsonify, send_from_directory
import torch
from werkzeug.utils import secure_filename
import uuid
import shutil
from PIL import Image
app = Flask(__name__)

# Đường dẫn tới mô hình YOLOv5
MODEL_PATH = 'best.pt'

# Tải mô hình YOLOv5
model = torch.hub.load('ultralytics/yolov5', 'custom', path=MODEL_PATH)

UPLOAD_FOLDER = 'uploads'
ANALYSES_FOLDER = 'analyses'

for folder in [UPLOAD_FOLDER, ANALYSES_FOLDER]:
    if not os.path.exists(folder):
        os.makedirs(folder)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['ANALYSES_FOLDER'] = ANALYSES_FOLDER

# Kích thước thực tế của hình ảnh (cm)
IMAGE_WIDTH_CM = 100  # Thay đổi giá trị này theo thực tế
IMAGE_HEIGHT_CM = 100  # Thay đổi giá trị này theo thực tế

def analyze_results(results, img_width_cm, img_height_cm):
    labels, cord = results.xyxyn[0][:, -1], results.xyxyn[0][:, :-1]
    num_holes = len(labels)
    hole_info = []
    widths = []
    lengths = []
    
    for i in range(num_holes):
        x1, y1, x2, y2, conf = cord[i]
        width = float(x2 - x1) * img_width_cm
        height = float(y2 - y1) * img_height_cm
        hole_info.append({
            "width": width,
            "length": height
        })
        widths.append(width)
        lengths.append(height)
    
    avg_width = sum(widths) / num_holes if num_holes > 0 else 0
    avg_length = sum(lengths) / num_holes if num_holes > 0 else 0

    # Tính toán mức độ xấu của mặt đường
    badness_level = avg_width * avg_length * num_holes  # Đây là công thức đơn giản, có thể điều chỉnh tùy theo yêu cầu
    should_across = badness_level < 1000  # Ví dụ cơ bản về cách xác định nên đi qua mặt đường này hay không

    return num_holes, hole_info, avg_width, avg_length, badness_level, should_across

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        random_suffix = uuid.uuid4().hex
        # filename = secure_filename(file.filename)
        converted_file_name = f"{random_suffix}.jpg"
        
        # Lưu ảnh gốc vào thư mục uploads
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], converted_file_name)
        file.save(file_path)

        # Xử lý nhận diện
        results = model(file_path)
        
        # Phân tích kết quả nhận diện
        num_holes, hole_info, avg_width, avg_length, badness_level, should_across = analyze_results(results, IMAGE_WIDTH_CM, IMAGE_HEIGHT_CM)
        
        # Tạo tên tệp mới cho ảnh phân tích từ uuid
        result_file_path = os.path.join(app.config['ANALYSES_FOLDER'], converted_file_name)
        
        # Lưu ảnh phân tích trực tiếp vào thư mục analyses với tên tệp từ uuid
        results.render()  # Render các kết quả lên hình ảnh
        img = Image.fromarray(results.ims[0])  # Lấy hình ảnh đầu tiên từ kết quả
        img.save(result_file_path)  # Lưu hình ảnh vào tệp đích

        # Trả về phản hồi
        return jsonify({
            "total_holes": num_holes,
            "holes": hole_info,
            "avg_width": avg_width,
            "avg_length": avg_length,
            "badness_level": badness_level,
            "should_across": should_across,
            "analysis_image": result_file_path,
            "image_id": random_suffix
        })

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/analyses/<filename>')
def analyzed_file(filename):
    return send_from_directory(app.config['ANALYSES_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
