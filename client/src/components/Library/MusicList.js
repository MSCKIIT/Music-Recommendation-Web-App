import classes from './MusicList.module.css';
import React from 'react'
import { Link } from 'react-router-dom';
import bg1 from "./assets/bg1.png";
import { useRef, useState, useEffect } from 'react'
import Loader from "react-loader-spinner";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Alert from '@mui/material/Alert';
const MusicList = () => {


  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

    useEffect(() => {
      setLoading(true);
      if(localStorage.getItem("songs")!=null)
      {
        console.log(localStorage.getItem("songs"));
        fetch(`https://api-for-music-rec.pratyushpatnai2.repl.co/?name=${localStorage.getItem("songs")}`)
          .then((res) => res.json())
          .then((data) => {
            const result = Object.values(data);
            console.log(result);
            setData(result);
          })
          .catch((err) => {
              setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
      else
      {
      
      fetch("https://api-for-music-rec.pratyushpatnai2.repl.co/?name=Faded")
        .then((res) => res.json())
        .then((data) => {
          const result = Object.values(data);
          console.log(result);
          setData(result);
        
          
       
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
      }
      
    }, []);
     function refresh()
     {
        fetch(`https://api-for-music-rec.pratyushpatnai2.repl.co/?name=${window.localStorage.getItem("songs")}`)
        .then((res) => res.json())
        .then((data) => {
          const result = Object.values(data);
          console.log(result);
          setData(result);
       
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
        console.log(window.localStorage.getItem("songs"));
     }
   function handlesubmit(e)
   {
     if(e.key==='Enter')
     {
      fetch(`https://api-for-music-rec.pratyushpatnai2.repl.co/?name=${e.target.value}`)
      .then((res) => res.json())
      .then((data) => {
        const result = Object.values(data);
        console.log(result);
        setData(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }
}



  

  const titleRef = useRef();
  if (loading) {
    const style = { position: "fixed", top: "50%", left: "60%", transform: "translate(-50%, -50%)" };
    return <div style={style}><Loader type="Audio" color="#2EE59D" height={50} width={50}  /></div>;
  }
  if (error || !Array.isArray(data)) {
    const style = { position: "fixed", top: "50%", left: "60%", transform: "translate(-50%, -50%)" };
    return <div style={style}><Alert severity="error">Oops something went wrong there!</Alert></div>;
  }
  function handleclick(e) {

    window.localStorage.setItem("songs", e.target.innerHTML);
  }
  return (
    <>

      <div className={classes.container}>
        <div className={classes.musicLeft}>
          <h2 className={classes.title} style={{ alignItems: "flex-start", justifyContent: "flex-start", fontSize: '40px', paddingTop: "15px", paddingLeft: "30px" }}>LET THE MUSIC SPEAK</h2>
          <div className={classes.content} ref={titleRef}>
            <div className={classes.btns}>
              <input className={classes.searchBar} type='search'
                placeholder="Search for songs..."
                onKeyDown={handlesubmit}
              />
              <button className={classes.refresh} onClick={refresh}>Refresh my playlist <RefreshOutlinedIcon /></button>
            </div>
            <div className={classes.contentrow} >

              {data.map((music) => (

                <div className={classes.music_row}>
                  <div className={classes.musicIcon} style={{ backgroundImage: `url(${"https://img.icons8.com/color/48/000000/music-robot.png"})` }}></div>
                  <div className={classes.musicDetails}> <Link onClick={handleclick} to={`/library/${music.name}`}>
                    <p key={`${music.name + music.artist}`} className="music">{music.name}</p></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.musicRight}>
          <div className={classes.bgImg} style={{ backgroundImage: `url(${bg1})` }}></div>
        </div>
        {/* <Other /> */}
      </div>

    </>
  )
}
export default MusicList;