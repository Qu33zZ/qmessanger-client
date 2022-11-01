import React from 'react';
import CloseButton from '../../ui/close.button/close.button';
import DragAndDrop from '../draganddrop/drag.and.drop';
import "./upload.avatar.popup.styles.css";

interface IPopupProps{
    opened:boolean;
    setOpened:React.Dispatch<React.SetStateAction<boolean>>;
    setAvatar:React.Dispatch<React.SetStateAction<any>>;
};

const UploadAvatarPopup:React.FC<IPopupProps> = ({opened, setOpened, setAvatar}) => {
    if(!opened) return <></>;
    return (
        <div className={'upload-avatar-popup'}>
            <div className="upload-avatar-popup-content">
                <CloseButton
                    onClick={() =>{setOpened(false)}}
                />
                <p className="title">
                    Upload avatar
                </p>   
                <DragAndDrop/>
            </div>
        </div>
    );
};

export default UploadAvatarPopup;