import React from 'react'

const buildDetail = (param, clickEvent) => (
    <div className='card bg-light' key={param.id}>
        <div className='row no-gutters'>
            <div className='col-md-4'>
                <img src={param.thumb} className='card-img' alt='...' />
            </div>
            <div className='col-md-8'>
                <div className='card-body'>
                    <h3 className='h6 card-title'><strong>Title: </strong>{param.title}</h3>
                    <p className='h6 card-text'><strong>Country: </strong>{param.country}</p>
                    <p className='h6 card-text'><strong>Year: </strong>{param.country}</p>
                    <p className='h6 card-text'><strong>Genre: </strong>{param.genre}</p>
                    <p className='h6 card-text'><strong>Tracks Numbers: </strong>{param.label.length}</p>
                    <button onClick={(event) => clickEvent(event, param)} type='button' className='btn btn-outline-dark'>Details</button>
                </div>
            </div>
        </div>
    </div>
)

const DetailResultVideo = ({ searchResult, clickEvent }) => {
    return (
        <div className='container detail-result-video'>
            {searchResult.map((element) => buildDetail(element, clickEvent))}
        </div>

    )
}

export default DetailResultVideo
