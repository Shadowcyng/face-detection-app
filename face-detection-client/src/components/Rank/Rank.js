import React from 'react';
const Rank =  ({name, entries}) =>{
        return(
            <div>
                <div className='white f3'>
                    {/* {console.log(name)}
                    {console.log(enteries)} */}
                   {`${name}, your Current Rank...  `}
                </div>
                <div className='white f1 font'>
                    {`${entries}`}
                </div>
            </div>
        );
    }

export default Rank;