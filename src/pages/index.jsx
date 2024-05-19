import React from 'react';
import dynamic from 'next/dynamic';

const TutorialContainer=dynamic(import ("../containers/Tutorial"),{ssr:false});


class Tutorial extends React.PureComponent{

    render(){

        const licenseServer = "";
        const mpdFile = "https://agcdn02.cdnext.stream.ne.jp/hls2/basic/data/prog_index.m3u8";
        const videoThumbnail = "https://blog.whatacotton.com/img/avatar_hua6de935b93fcb9ab7b26eab951eb946e_1245904_300x0_resize_box_3.png";

        return (

            <TutorialContainer 
                licenseServer={licenseServer}
                manifestUrl={mpdFile}
                posterUrl={videoThumbnail}
            />
        )
    }
}

export default Tutorial;