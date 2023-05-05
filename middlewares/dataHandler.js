const ownedData = async (table_name, data_id, user_id) => {
    const data = await table_name.findOne(
        {
            where: {
            id: data_id,
            user_id: user_id
            }
        }
    );
    
    if (!data) throw { name: 'ErrorNotFound' };
  
    return data;
};
  
module.exports = ownedData;
  