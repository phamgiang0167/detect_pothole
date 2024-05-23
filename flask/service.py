from flask import Flask, request, jsonify
import torch
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Đường dẫn tới mô hình YOLOv5
MODEL_PATH = 'best.pt'

# Tải mô hình YOLOv5
model = torch.hub.load('ultralytics/yolov5', 'custom', path=MODEL_PATH)

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"})
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Xử lý nhận diện
        results = model(file_path)
        results.save(save_dir=app.config['UPLOAD_FOLDER'])

        result_image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename).replace('.jpg', '.jpg')
        return jsonify({"result_image": result_image_path})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
