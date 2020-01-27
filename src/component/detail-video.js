import React from 'react'

const buildClassName = (label, trackOfPlaylist) => {
    return 'fas p-2 rounded-lg m-2 btn btn-outline-dark fa-plus'
}

const DetailVideo = ({ detailSelected, trackOfPlaylist, optionClickEvent }) => {
    return (
        <div className='container detail-video'>
            <div className=''>
                <img src={detailSelected.thumb} className='card-img' alt='...' />
            </div>
            <div className=''>
                <ul className='list-group'>
                    {trackOfPlaylist.map((item, index) => (
                        <li key={index} id={index} className='h5 list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
                            {item.title}
                            <span
                                key={index}
                                onClick={(event) =>
                                    optionClickEvent(event, ({ title: item.title, uri: item.uri, masterId: detailSelected.master_id }))}
                            >
                                <i className={buildClassName()} />
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DetailVideo
