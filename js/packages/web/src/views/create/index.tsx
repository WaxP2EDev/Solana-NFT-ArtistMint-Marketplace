import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {Layout, Row, Col, Button, Upload, message, Form, Input, Tooltip } from 'antd';
import { InboxOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { remove } from 'lodash';
// import 'react-dropzone-uploader/dist/styles.css'

const { Content } = Layout;
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: false,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export const CreateView = () => {
  // const [count_property, setCountProperty] = useState(0);
  // const [count_array, setCountArray] = useState(Array(0));
  // useEffect(() => {
  //   const t_array = count_array;
  //   t_array.push(count_property);
  //   console.log(count_property)
  //   setCountArray(t_array);
  // });
  // function Remove(item){
  //   console.log(item);
  //   // count_array.map(i => console.log(i))
  //   // setCountArray(count_array.filter(i => i !== item+1));
  //   console.log(count_array)
  // }
  return (
    <>
      <Row>
        <Col md={6}></Col>
        <Col md={12}>
          <Content className="content_top">
          <div className="section">
            <h2>Create new item</h2>
            <p className="font-middle">Image, Video, Audio, or 3D Model</p>
          </div>
          </Content>
          <Content className="content">
            <div className="section">
              <p className="font-small">File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, OGG, GLB, GLTF. Max size: 40MB</p>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Drag & drop file
                </p>
              </Dragger>
            </div>
          </Content>
          <Content className="content">
            <div className="section">
              <p className="font-middle">Name</p>
              <input type="text" className="form-control form-control-lg" placeholder="Item Name" />
              {/* <Input placeholder='Item Name' /> */}
            </div>
            <br />
            <div className="section">
              <p className="font-middle">External Link</p>
              <p className="font-small">ARTIMAC will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</p>
              <input type="text" className="form-control form-control-lg" placeholder="https://yoursite.io/item/123" />
              {/* <Input placeholder='https://yoursite.io/item/123' /> */}
            </div>
            <br />
            <div className="section">
              <p className="font-middle">Description</p>
              <p className="font-small">The description will be included on the item's detail page underneath its image.</p>
              <textarea className="form-control" rows="5" id="comment" name="text"></textarea>
              {/* <Input.TextArea placeholder="e.g. 'Fuzzy Panda's is a series of 10,000 algorithmically generated Panda's...''" /> */}
            </div>
            <br />
            <div className="section">
              <p className="font-middle">Collection</p>
              <p className="font-small">This is the collection where your item will appear.</p>
              <div className="form-group">
                <label htmlFor="collection">Select collection</label>
                <select className="form-control form-control-lg" id="collection">
                  <option>1</option>
                  <option>2</option>
                </select>
              </div>
            </div>
            <br />
            <div className="section">
              <p className="font-middle">Seller Fee</p>
              <input type="text" className="form-control form-control-lg" placeholder="Royalties on secondary sales(%), use a whole number between 0 and 100" />
              {/* <Input placeholder="Royalties on secondary sales(%), use a whole number between 0 and 100" /> */}
            </div>
            <br />
            <div className="section">
              <p className="font-middle">
                Properties&nbsp;
                <Tooltip title="Properties are traits that make your NFT special and/or unique. This field is optional. Feel free to leave it blank.">
                  <QuestionCircleOutlined style={{fontSize: '10px'}} />
                </Tooltip>
              </p>
                <div>              
                  <Row>
                    <Col span={9}>
                      <input type="text" className="form-control form-control-lg" placeholder="e.g. Color" />
                      {/* <Input placeholder="e.g. Color" /> */}
                    </Col>
                    <Col offset={1} span={9}>
                      <input type="text" className="form-control form-control-lg" placeholder="e.g. Red" />
                      {/* <Input placeholder="e.g. Red" /> */}
                    </Col>
                    <Col offset={1} span={2}>
                      <Button type="link" className="vh-center">Remove</Button>
                    </Col>
                  </Row>
                </div>
                <br />
                <div>
                <Button type="link">Add more</Button>
                </div>
                <br />
                <Row>
                  <Col md={11}></Col>
                  <Col md={2}>
                    <Button type="primary" size="large" className="submit">Submit</Button>
                  </Col>
                  <Col md={11}></Col>
                </Row>
            </div>
          </Content>
        </Col>
        <Col md={6}></Col>
      </Row>
    </>
  )
}
