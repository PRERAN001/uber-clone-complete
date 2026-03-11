const captionmodel = require('../models/caption.model')

const createcaption = async ({ firstname, lastname, email, password, color, plate, capacity, vechicletype }) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vechicletype) {
        throw Error("all fields are equried")
    }
    const caption = await captionmodel.create({
        firstname, lastname, email, password,
        vechicle: {
            color, plate, capacity, vechicletype
        }
    })
    return caption
}
module.exports = createcaption
