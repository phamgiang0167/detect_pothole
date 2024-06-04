import axios from 'axios';
import FormData from 'form-data';

export const uploadFile = async (req, res) => {
  try {
    const form = new FormData();
    form.append('file', req.file.buffer, req.file.originalname);

    const response = await axios.post('http://127.0.0.1:5001/predict', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    const { total_holes, holes, avg_width, avg_length, badness_level, should_across, analysis_image } = response.data;
    res.json({ total_holes, holes, avg_width, avg_length, badness_level, should_across, analysis_image });
  } catch (error) {
    res.status(500).send('Error processing image');
  }
};

export const getResult = (req, res) => {
  const { total_holes, holes, avg_width, avg_length, badness_level, should_across } = req.query;
  const holeInfo = JSON.parse(holes); // Chuyển đổi thông tin lỗ từ chuỗi JSON thành đối tượng JavaScript
  const holeList = holeInfo.map(hole => `<li>Chiều rộng: ${hole.width}, Chiều dài: ${hole.length}</li>`).join('');
  res.send(`
    <h1>Kết quả nhận diện</h1>
    <p>Số lượng lỗ: ${total_holes}</p>
    <ul>${holeList}</ul>
    <p>Trung bình chiều rộng: ${avg_width}</p>
    <p>Trung bình chiều dài: ${avg_length}</p>
    <p>Mức độ xấu của mặt đường: ${badness_level}</p>
    <p>Nên đi qua mặt đường này: ${should_across}</p>
  `);
};
