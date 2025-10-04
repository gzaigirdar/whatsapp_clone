import { useRef, useState } from "react";

function Picture({ readablepicture, setPicture, setReadableimage }) {
  const inputRef = useRef();
  const [error, setError] = useState('');

  function handleInput(e) {
    const maxSizemb = 2;
    const picture = e.target.files[0];
    if (!picture) return; // no file selected


    const validTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!validTypes.includes(picture.type)) {
      setError(`${picture.name} format is not supported`);
      return;
    } 
    
    else if (picture.size > maxSizemb * 1024 * 1024) {
      const sizeMB = (picture.size / (1024 * 1024)).toFixed(2);
      setError(`${sizeMB} MB is too big`);
      return;
    } 
    else {
      setError(''); 

      // Set the raw file in state
      setPicture(picture);

      
      const reader = new FileReader();

      // Read the file and convert it to base64 
      reader.readAsDataURL(picture);

      // This function will trigger once file is converted to base64
      // then the result will be set as the image preview
      reader.onload = (e) => {
        setReadableimage(e.target.result);
      };
    }
  }

  console.log(readablepicture);

  return (
    <div className="mt-8 content-center dark:text">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide"></label>

      {readablepicture ? (
        <div>
          <img
            className="w-20 h-20 object-cover rounded-full"
            src={readablepicture}
            alt="picture"
          />
        </div>
      ) : (
        <div
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer"
          onClick={() => inputRef.current.click()} // clicking div triggers file picker
        >
          Upload Picture
        </div>
      )}

      {error && <p className="text-red-700">{error}</p>}

      {/* Hidden file input with ref, triggers handleInput on change */}
      <input
        type="file"
        name="picture"
        id="picture"
        hidden
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handleInput} // triggers when a file is selected
      />
    </div>
  );
}

export default Picture;
