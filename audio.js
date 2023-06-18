
// import { useState, useEffect } from 'react';

// export default function useAdminGroups(audio_file) {
//     const [spheres, setSpheres] = useState([]);
  
//     useEffect(() => {
//         let isSubscribed = true

//         const submitAudio = async () => {
//             const adminGroups = await getUserAdminGroups(user_id)
//             if (isSubscribed) {
//                 setGroups(adminGroups)
//             }
            
//         }

//         updateGroups().catch(console.error)

//         return () => isSubscribed = false
//     })

//     return adminGroups
// }