import {useState, useEffect} from 'react';

const Main = () => {

    const [memes, setMemes] = useState([])

    function getRandomInt(min, max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
        .then(res => res.json())
        .then(resData => setMemes(resData.data.memes))
        console.log('Check!')
    }, [])

    console.log(memes)

    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg",

    })

    const handleChange = (e) => {
        const {value, name} = e.currentTarget
        setMeme(prevName => ({
            ...prevName,
            [name]: value
        }))
    }

    const handleClick = () => {
        const memeObj = memes[getRandomInt(1, memes.length)]
        setMeme(prevMeme=>({...prevMeme, imageUrl: memeObj.url}))
    }
   
    return (

        

        <main>
            <div className='form'>
                <label>Top Text:
                    <input
                     type='text'
                     name="topText"
                     placeholder={meme.topText}
                     onChange={handleChange}
                     value={meme.topText}
                    />

                </label>
                <label>Bottom Text:
                    <input
                     type='text'
                     name="bottomText"
                     placeholder={meme.bottomText}
                     onChange={handleChange}
                     value={meme.bottomText}
                    />
                </label>
                <button
                onClick={handleClick}
                >Get a new meme image 🖼</button>
            </div>
            
            <div className='meme'>
                <img src={meme.imageUrl}/>
                <span className='top'>{meme.topText}</span>
                <span className='bottom'>{meme.bottomText}</span>
            </div>
            
        </main>
    )
}

export default Main  