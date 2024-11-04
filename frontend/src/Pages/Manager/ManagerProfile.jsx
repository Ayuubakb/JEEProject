import React, { useEffect, useState } from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthConfig } from '../../Actions/config';
import { getConnectedUser } from '../../Actions/authAction';

const ManagerProfile = () => {
  const dispatch=useDispatch()
  const userInfos=useSelector(state=>state.authReducer.user);
  const agencies=useSelector(state=>state.agencyReducer.agencies);
  const [infos,setInfos]=useState({id_user:"",first_name:"", last_name:"", email:"", password:"",agency:{city:""}})
  const handleInputChange=(e)=>{
    setInfos((prev)=>{return {...prev,[e.target.name]:e.target.value}})
  }
  const [err,setErr]=useState({err:null,updated:false})
  const config=getAuthConfig()
  const handleModify=async()=>{
    const response=await fetch(`${process.env.REACT_APP_SERVER_URI}/manager/update`,{
      method:"POST",
      ...config,
      body:JSON.stringify(infos)
    })
    if(!response.ok)
      setErr({err:await response.text(),updated:false})
    else{
      dispatch(getConnectedUser())
      setToModify(false)
      setErr({err:"Données modifiées",updated:true})
    }
  }
  useEffect(()=>{
    if(userInfos!=null)
      setInfos({
        id_user:localStorage.getItem("userId"),
        first_name:userInfos.first_name,
        last_name:userInfos.last_name, 
        email:userInfos.email, 
        password:"",
        agency:{city:userInfos.city}
      })
  },[userInfos])
  const [toModify,setToModify]=useState(false);
  
  return (
    <section className='profile'>
      <div class="bienvenu">
          <h1>Bienvenue,<br></br> {infos.first_name} {infos.last_name}</h1>
          {
            !toModify?
            <button onClick={()=>setToModify(true)}> <EditIcon/> Modifier Mon Profile</button>
            :<button onClick={handleModify}> <SaveIcon/> Enregistrer les modifications</button>
          }
      </div>
      {
        err.err!==null?<p className='err' style={{backgroundColor:err.updated?"blue":"red"}}>{err.err}</p>:null
      }
      <div className='infoPerso'>
        <div>
          <label>Prénom : </label>
          <input
            type='text'
            value={infos.first_name}
            name="first_name"
            onChange={(e)=>handleInputChange(e)}
            disabled={!toModify}
          />
        </div>
        <div>
          <label> Nom :</label>
          <input
            type='text'
            value={infos.last_name}
            name="last_name"
            onChange={(e)=>handleInputChange(e)}
            disabled={!toModify}
          />
        </div>
        {
          toModify?
          <div>
            <label>Mot De Passe : </label>
            <input
              type='password'
              value={infos.password}
              name="password"
              onChange={(e)=>handleInputChange(e)}
              disabled={!toModify}
            />
          </div>:null
        }
        <div>
          <label><EmailIcon/> Email : </label>
          <input
            type='email'
            value={infos.email}
            name="email"
            onChange={(e)=>handleInputChange(e)}
            disabled={true}
          />
        </div>
      </div>
      <div className='agencyInfo'>
        <div>
          <label><PlaceIcon/> Agence</label>
          {
            !toModify?
            <p>{userInfos?.city} - {agencies.filter((a)=>a.city===userInfos?.city)[0]?.address}</p>
            :<select 
              name="city" 
              value={infos.agency.city} 
              onChange={(e)=>{setInfos((prev)=>{return{...prev,agency:{city:e.target.value}}})}}>
              {
                agencies.map((a)=>{
                  return(
                    <option value={a.city}>{a.city} - {a.address}</option>
                  )
                })
              }
            </select>
          } 
        </div>
      </div>
    </section>
  )
}

export default ManagerProfile
