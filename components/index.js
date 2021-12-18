import {useEffect, useState} from 'react';
import './index.css';
import Modal from 'react-modal'
function Homepage(){
    const [ Title , setTitle ] = useState('')
    // const [res,setres]=useState(false)
    const[status,setstatus]=useState(false)
    const [sresult,setsresult] = useState([])
    const[mdata,setmdata]=useState([])
    
    const search=async (Title) => {
        // elem.preventDefault();
            const response = await fetch(`https://api.mfapi.in/mf/search?q=${Title}`, {
                method: 'GET', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json'
                
                },


            });
            const data=await response.json();
            console.log(data)
            if(data){
                // setres(true)
                setstatus(true)
                setsresult(data)
                setmdata(data)
                
            }
            
        }
        useEffect(()=>{
            if (Title.length!==0){
                search(Title)
            }
        },[Title])
    // search(Title)
    const [printres,setprintres]=useState([])
    const mfund=async (elem,e)=>{
        // setprintres(...printres,{data:elem})
        setprintres([...printres,elem])
        console.log('fundname=',elem)  //fundname
        console.log('schemecode=',e)  //id
        setmdata(e)
        setstatus(false)
        setsresult([])
        
    }
    const[mode,setmode]=useState([])
    const[modalstatus,setmodalstatus]=useState(false)
    const [unit,setunit]=useState('1')
    const model=async (Title) => {
        // elem.preventDefault();
            const response = await fetch(`https://api.mfapi.in/mf/${mdata}`, {
                method: 'GET', 
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin', 
                headers: {
                'Content-Type': 'application/json'
                
                },
            });
            const data1=await response.json();
            console.log(data1)
            if(data1){
                // setres(true)
                console.log('data1',data1)
                setmode(data1)
                setmodalstatus(true)
            }
        }

    return(
        <div className='container'>
            <div className='searchpage'>
            <h1>MF store</h1>
            <input value={Title} placeholder='search' onChange={elem => {setTitle(elem.target.value)}}/>
            {/* <h1>{Title}</h1> */}
            {status && sresult.map(function(post){
                return(
                    <div >
                    <p className="searchresult" onClick={()=>mfund(post.schemeName,post.schemeCode)}>{post.schemeName}</p>
                    </div>
                )
            })}
            </div>
            <div className='portfolio'>
            {console.log(printres)}
            
            {!status && printres.map((elem,idx)=>
            <p onClick={()=>model(mdata)}>{elem}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{unit}units</p>)}
            {console.log('printers',printres)}
            </div>
            <div className='modalcont'>
            <Modal className= 'modal' isOpen={modalstatus} onRequestClose = {() => {setmodalstatus(false)}}>
                
                {mode.length!==0 && console.log('fundinf',mode.meta.fund_house)}
                {mode.length!==0 && <div>
                    <p><b>Scheme name </b>: {mode.meta.scheme_name}</p>
                    <p><b>fund house </b>: {mode.meta.fund_house}</p>
                    <p><b>Scheme category </b>: {mode.meta.scheme_category}</p>
                    <p><b>Scheme type </b>: {mode.meta.scheme_type}</p>
                    <p><b>latest nav </b> :{mode.data[0].nav}</p>
                    <p><b>latest nav date </b>: {mode.data[0].date}</p>
                    <div className='m'>
              <div className='buy'>
              <input></input>
              <p>Buy</p>
              </div>
              <div className='sell'>
              <input></input>
              <p>Sell</p>
              </div>
              </div>
                </div> }
                
                
            </Modal>
            </div>

        </div>
    );
}
export default Homepage;


//