import React from 'react';
import CloseButton from '../../ui/close.button/close.button';
import Popup from '../../ui/popup/popup';
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
        <Popup
            opened = {opened}
            setOpened={setOpened}
        >
            <CloseButton onClick={() =>{setOpened(false)}}/>
            <DragAndDrop 
                setImage={setAvatar}
            />
        </Popup>

    );
};

export default UploadAvatarPopup;