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

    const resultImage = response.data.result_image;
    res.json({ resultImage });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing image');
  }
};

export const getResult = (req, res) => {
  const resultImage = req.query.image;
  res.send(`<h1>Kết quả nhận diện</h1><img src="${resultImage}" alt="Result Image">`);
};
