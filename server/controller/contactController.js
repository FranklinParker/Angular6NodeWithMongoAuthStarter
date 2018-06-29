const Contact = require('../models/Conact').Contact;

/**
 * save a contact
 *
 *
 * @param params
 * @returns {Promise<*>}
 */
const saveContact = async (params) => {
	const contactData = params.actionData;

	try {
		const contactSearch = await Contact.findOne({email: contactData.email });
		console.log('contactSearch', contactSearch);
		if(contactSearch){
			return {
				success: false,
				message: 'This Contact email exists'
			};
		}
		const contact = new Contact({
			firstName: contactData.firstName,
			lastName: contactData.lastName,
			email: contactData.email,
			phone: contactData.phone
		});
		const contactRec = await contact.save();
		return {
			success: true,
			record: contactRec
		};
	} catch (e) {
		return {
			success: false,
			message: e.message
		};
	}

};

/**
 * get a list of contacts
 *
 * @param params
 * @returns {Promise<*>}
 */

const getContacts = async (params)=>{
	console.log('getContacts - params', params)
  try {
    const contactRecords = await Contact.find();
    console.log('contactRecords', contactRecords);

    return {
      success: true,
      records: contactRecords
    };
  } catch (e) {
    return {
      success: false,
      message: e.message
    };
  }
}


module.exports ={
	saveContact,
	getContacts
}