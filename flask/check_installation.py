import importlib.metadata

# Lấy phiên bản của các thư viện
flask_version = importlib.metadata.version('flask')
torch_version = importlib.metadata.version('torch')
opencv_version = importlib.metadata.version('opencv-python-headless')

print("Flask version:", flask_version)
print("PyTorch version:", torch_version)
print("OpenCV version:", opencv_version)

# Kiểm tra YOLOv5
try:
    import yolov5
    print("YOLOv5 imported successfully")
except ImportError:
    print("YOLOv5 not installed")
