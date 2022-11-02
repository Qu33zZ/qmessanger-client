import React, { useState } from 'react';
import "./drag.and.drop.styles.css";


interface IDragAndDropProps{
    setImage:React.Dispatch<React.SetStateAction<File | null>>;
}
const DragAndDrop:React.FC<IDragAndDropProps> = ({setImage}) => {
    const [drag, setDrag] = useState<boolean>(false);

    const handleDragStart = (e:React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
        setDrag(true);
    };

    const handleDragLeave = (e:React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
        setDrag(false);
    };

    const dropHandler = (e:React.DragEvent<HTMLDivElement>) =>{
        e.preventDefault();
        const [file] = e.dataTransfer.files;
        setImage(file);
    };

    return (
        <div className={`drag-and-drop ${drag && "active"}`} 
            onDragStart={handleDragStart}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragStart}
            onDrop ={dropHandler}
        >           
            {
                drag ? <p>Drop your file to upload</p> 
                     : <p>Drag your avatar to this area</p>
            }
        </div>
    );
};

export default DragAndDrop;