import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";
// import { HfInference } from "huggingface";

function App() {

  let [imgUrl, setImgUrl]=useState();
  let inputText=useRef();

  async function query(data) {
    setImgUrl("https://www.icegif.com/wp-content/uploads/2023/07/icegif-1262.gif")
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    
    const result = await response.blob();
    console.log(result);
    return result;

  }

function getImage(){
  console.log(inputText.current.value);
  query({"inputs": inputText.current.value}).then((response) => {
    console.log(response);
    let data2=URL.createObjectURL(response)
    // console.log(data2);
    setImgUrl(data2)
  });
}
  



  return (
    <div className="App">
      <h1>Generate Image With AI</h1>
      <div className="inputBox">
        {" "}
        <textarea ref={inputText}
          name=""
          id=""
          cols="80"
          rows="0"
          placeholder="Enter text to generate image"
        ></textarea>
        <button onClick={getImage}>Generate</button>
      </div>
      <div className="image">
        <img
          src={imgUrl}
          alt=""
        />
      </div>
    </div>
  );
}

export default App;
