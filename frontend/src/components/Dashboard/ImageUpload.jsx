import AvatarEditor from 'react-avatar-editor';
import { useState, useRef } from 'react';

function ImageUpload({ getProfileData, setEditAvatar, handleAvatarBtn }) {
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const editorRef = useRef(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  async function uploadAvatar() {
    handleAvatarBtn();
    const form = new FormData();
    console.log(form.current);

    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      canvas.toBlob(async (blob) => {
        form.append('avatar', blob, 'avatar.png');
        console.log(form);

        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKENDURL}/api/user/image`,
            {
              method: 'PUT',
              body: form,
              credentials: 'include',
            }
          );
          const response = await res.json();

          if (res.ok) {
            setEditAvatar(false);
            getProfileData();
            console.log(response.message);
          } else if (res.status === 404) {
            console.error(response.message);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  }

  return (
    <form onSubmit={uploadAvatar}>
      <div className='avatar-input'>
        <label htmlFor='avatar' id='avatar-label'>
          Select image to use as avatar.
        </label>
        <input
          type='file'
          onChange={handleImageChange}
          name='avatar'
          id='avatar'
        />

        {image && (
          <>
            <AvatarEditor
              ref={editorRef}
              image={image}
              width={250}
              height={250}
              border={0}
              borderRadius={150}
              scale={zoom}
            />
            <div className='slider'>
              <label htmlFor='zoom'>Zoom</label>
              <input
                type='range'
                id='zoom'
                min={1}
                max={5}
                defaultValue={1}
                step={0.1}
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div className='buttons'>
        <button type='submit' className='submit'>
          Upload
        </button>
        <button type='button' className='cancel' onClick={handleAvatarBtn}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ImageUpload;
