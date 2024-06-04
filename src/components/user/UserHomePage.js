import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createInstagramPost, getUserData } from "../../services/userServices";
import { Button, Form, Input, TextArea, notification } from "antd";

import './css/UserHomePage.css'
import { generateImageBasedOnDescription, generateImageCaption, generatePostDescription } from "../../services/contentService";


const UserHomePage = () => {

  const [imageUrl, setImageUrl] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  
  const [form] = Form.useForm();
  



  const onImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const onThemeChange = (event) => {
    setTheme(event.target.value);
  };
  const generateContent = () => {
    if (theme && !imageUrl) {
      generatePostDescription({"theme":theme}).then(res => {
        console.log(res.description)
        setDescription(res.description)
        form.setFieldsValue({ description: res.description });
        if (res.description) {
          generateImageBasedOnDescription(description).then(res => {
            console.log(res.imageUrl)
            setImageUrl(res.imageUrl)
            form.setFieldsValue({ imageUrl: res.imageUrl });
          })
        }
      })
    } else if (imageUrl && theme) {
      generateImageCaption(imageUrl).then(res => {
        console.log(res.caption)
        setCaption(res.caption)
        generatePostDescription({ "caption": res.caption, "theme": theme }).then(res => {
          console.log(res.description)
          setDescription(res.description)
          form.setFieldsValue({ description: res.description });
        })
      })
      
    } 
  }

  const submit = (initialValues) => {
    console.log(initialValues);
    createInstagramPost(initialValues).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <div className="modal-content">
      <div className="image-container">
        {imageUrl && (
          <div>
          <img src={imageUrl} className="preview-image" />
          <div style={{textAlign:"center"}}>{caption}</div>
            </div>
        )}
      </div>
      <div className="form-container">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submit}
        >

          <Form.Item
            className="description-area"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea style={{ width: 400, height: 200 }} placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="theme"
            rules={[{ required: true }]}
          >
            <Input placeholder="Theme" onChange={onThemeChange} />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            rules={[{ required: true }]}
          >
            <Input placeholder="Image url"
              onChange={onImageUrlChange} />
          </Form.Item>
          <Form.Item>
            <Button className="submit-button" onClick={generateContent}>
              Generate content
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className="submit-button" type="primary" htmlType="submit">
              Create Instagram post
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserHomePage;