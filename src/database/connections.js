// import sql from 'mssql';

// // const dbSetting = {
// //     user: 'sa',
// //     password: 'Sertec01',
// //     server: '172.31.66.120',
// //     database: 'galme_test',
// //     options: {
// //         encrypt: true,
// //         trustServerCertificate: true
// //     }
// // }
// const dbSetting = {
//     user: 'postgres',
//     password: 'Sertec01',
//     server: '172.31.66.120',
//     port:5432,
//     database: 'Galme',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// }
// export async function getConnections() {
//     // try {
//     //     return pool;
//     // } catch (error) {
//     //     console.log(error)
//     // }
//     const pool = await sql.connect(dbSetting);
    
//     return  pool;
// }
// export {sql};
// getConnections() 