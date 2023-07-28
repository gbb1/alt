import { useEffect, useState, useMemo } from "react";

import { FaRegImage } from 'react-icons/fa6'

const Screenshot = ({ items, setItems, xIndex }) => {
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState();

  const image = useMemo(() => {
    return items[xIndex].screenshot || ''
  }, [items[xIndex].screenshot])
  // rendering previews
  useEffect(() => {
    if (!files) return;
    // let tmp = [];
    const objUrl = URL.createObjectURL(files[0])
    // for (let i = 0; i < files.length; i++) {
    //   tmp.push(URL.createObjectURL(files[i]));
    // }
    // const objectUrls = tmp;
    setPreview(objUrl);

    // free memory
    return () => {
      URL.revokeObjectURL(objUrl);
    }
    // for (let i = 0; i < objectUrls.length; i++) {
    //   return () => {
    //   };
    // }
  }, [files]);

  // useEffect(() => {
  //   let obj = items[xIndex]
  //   if ('screenshot' in obj) {
  //     setPreview(obj.screenshot)
  //   }
  // }, [items])



  useEffect(() => {
    let ref = [...items]
    let obj = ref[xIndex]
    if (!('screenshot' in obj)) {
      obj.screenshot = ''
    }
    obj.screenshot = preview;
    setItems(ref)
  }, [preview])

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