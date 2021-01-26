import React, { useState } from "react";
import { css } from '@emotion/react'
import Reset from '../graphics/reset.svg'

const imageUploadStyles = css`
  display: flex;
  margin-top: 2px;
  .file-input {
    height: 20px;
    box-sizing: border-box;
    font-size: 10px;
    margin-right: 10px;
    border: 1px dashed rgba(255,255,255,0.5);
    text-transform: uppercase;
    white-space: nowrap;
    padding-top: 2px;
    padding-left: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 160px;
    @media (min-width: 640px) {
      width: 208px;
    }
    cursor: pointer;
  }
  .reset {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`

const ImageUpload = ({ setImageData, initImage }) => {
  const imageUploader = React.useRef(null);
  const [fileName, setFileName] = useState(initImage)
  const [isChanged, setIsChanged] = useState(false)
  
  const handleImageUpload = e => {
    const [file] = e.target.files;
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setFileName(file.name)
        setIsChanged(true)
        setImageData(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetImage = () => {
    setImageData(undefined)
    setIsChanged(false)
    setFileName(initImage)
  }

  return (
    <>
      <input
        type="file"
        accept="image/gif, image/jpeg, image/png"
        onChange={handleImageUpload}
        ref={imageUploader}
        style={{
          display: "none"
        }}
      />
      <div css={imageUploadStyles}>
        <div className="file-input" onClick={() => imageUploader.current.click()}>
          {fileName}
        </div>
        {isChanged && <div className="reset" onClick={resetImage}><Reset /></div>}
      </div>
    </>
  );
}

export default ImageUpload