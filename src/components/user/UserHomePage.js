import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createInstagramPost, getUserData } from "../../services/userServices";
import { Button, Form, Input, Modal, notification } from "antd";

import './css/UserHomePage.css'


const UserHomePage = () => {

  const [imageUrl, setImageUrl] = useState("");

  const onImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

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
          <img src={imageUrl} className="preview-image" />
        )}
      </div>
      <div className="form-container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={submit}
        >
          <Form.Item
            name="description"
            rules={[{ required: true }]}
          >
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            rules={[{ required: true }]}
          >
            <Input placeholder="Image url"
              onChange={onImageUrlChange} />
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