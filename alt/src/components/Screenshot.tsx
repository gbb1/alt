import { useEffect, useState, useMemo } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { MD5 } from 'crypto-js';

import { storage } from '../../firebaseConfig'
import { FaRegImage } from 'react-icons/fa6'

const Screenshot = ({ user, projectId, items, setItems, xIndex }) => {
  const [files, setFiles] = useState(null);
  const [preview, setPreview] = useState(null);

  const storage = getStorage()

  const image = useMemo(() => {
    // console.log('inmemo', items[xIndex], items[xIndex].screenshot)
    return items[xIndex].screenshot || ''
  }, [items[xIndex].screenshot])
  // rendering previews
  useEffect(() => {
    if (!files) return;

    const objUrl = URL.createObjectURL(files[0])
    uploadFile(files[0], objUrl)

    return () => {
      URL.revokeObjectURL(objUrl);
    }

  }, [files]);

  // useEffect(() => {
  //   let obj = items[xIndex]
  //   if ('screenshot' in obj) {
  //     setPreview(obj.screenshot)
  //   }
  // }, [items])

  const uploadFile = (file, url) => {

    const split = url.split('/')
    const objUrl = split[split.length - 1]

    const hash = MD5(user).toString();

    const path = 'screenshots/' + hash + '/' + projectId + '/' + objUrl

    const fileImageRef = ref(storage, path);
    const storageRef = ref(storage, fileImageRef)

    uploadBytes(storageRef, file).then((snapshot) => {
      getDownloadURL(storageRef)
        .then((url) => {
          const ref = [...items]
          const obj = ref[xIndex]
          if (!('screenshot' in obj)) {
            obj.screenshot = ''
            obj.path = ''
          }
          let prior = obj.path
          obj.screenshot = url;
          obj.path = path
          setItems(ref)

          return prior
        })
        .then((old) => {
          if (!old.length) return

          const oldRef = ref(storage, old);
          return deleteObject(oldRef)
        })
        .then((res) => {
          console.log(res)
        })
    })
    .catch((err) => {
      console.log(err)
    })
  }


  // useEffect(() => {
  //   if (!preview) return
  //   let ref = [...items]
  //   let obj = ref[xIndex]
  //   if (!('screenshot' in obj)) {
  //     obj.screenshot = ''
  //   }
  //   obj.screenshot = preview;
  //   setItems(ref)
  // }, [preview])

  return (
    <div className="w-[300px] flex flex-col gap-2 items-center">
      {/* <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        className="w-full"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
          }
        }}
      /> */}
      <label className="w-max bg-gray-200 px-3 py-2 rounded-lg text-sm">
        <input
          type="file"
          className="hidden"
          accept="image/jpg, image/jpeg, image/png"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFiles(e.target.files);
            }
          }}
        />
        <div className="flex flex-row gap-2 items-center">
          Set screenshot
          <FaRegImage />
        </div>
      </label>

      { image
        ? <img className=" max-w-full rounded-lg" src={image} />
        : null
      }
    </div>
  );
}

export default Screenshot;