

const { sequelize } = require('../../sequelizeConfig')
const model_usuario_sistema = require('../models/usuario_sistema.model');
const model_persona = require('../models/persona.model');
const model_contacto = require('../models/contacto.model');
const model_rol = require('../models/rol.model')
const model_datos_personal = require('../models/datos_personal.model')
const model_telefono = require('../models/telefono.model')
const bcrypt = require('bcrypt');
const moment = require('moment');

import { Sequelize } from 'sequelize';
import { getLastId } from '../utils/utils';

export const getUser = async (req, res) => {
    const response = await model_usuario_sistema.findAll({
        include: [
            {
                model: model_persona,
                as: 'persona'
            },
            {
                model: model_rol,
                as: 'rol'
            },
            {
                model: model_datos_personal,
                as: 'datos_personal'
            }

        ]
    });
    res.send(response)
};
export const getUserId = async (req, res) => {
    let id = req.params.id;
    model_usuario_sistema.findOne({
        where: {
            id_usuario_sistema: id
        },
        include: [
            {
                model: model_persona,
                as: 'persona'
            },
            {
                model: model_rol,
                as: 'rol'
            },
            {
                model: model_datos_personal,
                as: 'datos_personal'
            }
        ]
    })
        .then((user) => {
            if (!user) {
                return res.json({ respuesta: 'Usuario no existe' })
            }
            return res.json(user);
        })
}
export const postUser = async (req, res) => {
    let newPersona;
    let newContact;
    let newTelefono;
    let newUser;
    let usuario_sistema;
    let idRol;
    console.log('ROL', req.body.rol.nombre)
    console.log('PERSONA', req.body.persona)
    console.log('CONTACTO',req.body.persona.contacto[0])
    console.log('TELEFONO',req.body.persona.contacto[0].telefono[0])
    console.log('COMPLETO',req.body)
    
    if (req.body.rol.nombre == 'administrador') { let idRol = 2 }
    let persona = {
        activo: req.body.activo,
        apellidos: req.body.persona.apellidos,
        custodia: req.body.custodia || null,
        detenido: req.body.detenido || null,
        fecha_creacion: moment().format('YYYY-MM-DD HH:mm:ss'),
        fecha_nacimiento: req.body.persona.fechaNacimiento,
        nacionalidad: req.body.persona.nacionalidad,
        nivel_peligrosidad: req.body.nivel_peligrosidad || null,
        nombres: req.body.persona.nombres,
        numero_documento: req.body.persona.numeroDocumento,
        requerido: req.body.requerido || null,
        tipo_documento: req.body.persona.tipoDocumento,
        credencial: req.body.persona.credencial,
        origen_documento: req.body.persona.origenDocumento
    };


    //------------------------------------------------------------------------------------------EMPIEZA LA TRANSACCION (ALTA DE USUARIO)--------------------------------------------------------------------------------->
    try {
        await sequelize.transaction(async (t) => {
            newPersona = await model_persona.create(persona, { transaction: t });
            let lastIdPersona = await getLastId('persona', 'id_persona');

            let contacto = {
                apartamento: req.body.persona.contacto[0].apartamento,
                barrio: req.body.persona.contacto[0].barrio,
                block: req.body.persona.contacto[0].block,
                calle_esquina: req.body.persona.contacto[0].calleEsquina,
                calle_principal: req.body.persona.contacto[0].callePrincipal,
                departamento: req.body.persona.contacto[0].departamento,
                email: req.body.persona.contacto[0].email,
                latitud: req.body.persona.contacto[0].latitud,
                longitud: req.body.persona.contacto[0].longitud,
                numero_puerta: req.body.persona.contacto[0].numeroPuerta,
                seccional: req.body.persona.contacto[0].seccional,
                solar: req.body.persona.contacto[0].solar,
                zona_operacional: req.body.persona.contacto[0].zonaOperacional,
                id_persona: lastIdPersona,
                manzana: req.body.persona.contacto[0].manzana,
                situacion_de_calle: req.body.persona.contacto[0].situacion_de_calle,
                bis: req.body.persona.contacto[0].bis
            };
            newContact = await model_contacto.create(contacto, { transaction: t });
            let lastIdContacto = await getLastId('contacto', 'id_contacto');

            let telefono = {
                numero: req.body.persona.contacto[0].telefono[0].numero,
                tipo: req.body.persona.contacto[0].telefono[0].tipo,
                nombre: req.body.persona.contacto[0].telefono[0].nombre,
                id_contacto: lastIdContacto
            }

            newTelefono = await model_telefono.create(telefono, { transaction: t })
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log('CONTRASEÑA HASHEADA',hashedPassword)

            usuario_sistema = {
                activo:true,
                fecha_creacion:moment().format('YYYY-MM-DD HH:mm:ss'),
                username:req.body.username,
                password:hashedPassword,
                id_persona:lastIdPersona,
                id_rol: idRol,
                ignorar: req.body.ignorar || null,
                unidad_ejecutora: req.body.unidad_ejecutora || null,
                departamentos_visibles: req.body.departamentos_visibles || null
            }
            console.log('USUARIO SISTEMA',usuario_sistema)
            newUser = await model_usuario_sistema.create(usuario_sistema,{transaction:t})
        });

        console.log('Transacción completada con éxito');
        res.status(200).json({ persona: newPersona, contacto: newContact, telefono: newTelefono,usuario_sistema:newUser });
        //------------------------------------------------------------------------------------------FIN DE TRANSACCION--------------------------------------------------------------------------------->
    } catch (error) {
        console.error('Error en la transacción:', error);
        res.status(500).json({ error: 'Hubo un error al crear el usuario' });
    }
};


export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {

        const user = await model_usuario_sistema.findByPk(userId);

        if (!user) {
            return res.status(404).json({ respuesta: 'Usuario no encontrado' });
        }


        await user.destroy();

        return res.status(200).json({ respuesta: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar usuario', error);
        return res.status(500).json({ respuesta: 'Error al eliminar usuario' });
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    model_persona.update(
        {
            activo,
            apellidos,
            custodia,
            detenido,
            fecha_creacion,
            fecha_nacimiento,
            nacionalidad,
            nivel_peligrosidad,
            nombres,
            numero_documento,
            requerido,
            tipo_documento,
            credencial,
            origen_documento
        },
        {
            where: { id_persona: userId },
        }
    )
        .then((result) => {
            // result[0] contiene el número de filas afectadas
            console.log(`${result[0]} filas actualizadas.`);
        })
        .catch((error) => {
            console.error('Error al actualizar:', error);
        });
}

//  bcrypt.hash(password, 10, (err, hash) => {
//                 if (err) {

//                     console.error('Error al encriptar la contraseña:', err);
//                 } else {

//                     console.log('Contraseña encriptada:', hash);
                    
//                     model_usuario_sistema.create({
//                         activo: true,
//                         password: hash,
//                         username: username,
//                         id_persona: lastIdPersona,
//                         id_rol: 2,
//                         ignorar: false,
//                         unidad_ejecutora: null,
//                         departamentos_visibles: null
//                     })
//                         .then((createdUser) => {
//                             console.log('Se generó el usuario con éxito', createdUser);
//                             res.status(201).json({ respuesta: 'Usuario creado exitosamente' });
//                         })
//                         .catch((err) => {
//                             console.error('Dio error', err);
//                             res.status(500).json({ respuesta: 'Error al crear el usuario' });
//                         });
//                 }
//             });