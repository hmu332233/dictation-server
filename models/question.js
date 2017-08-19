var questionSchema = function (data){
	return {
		number: data.number,
		sentence: data.sentence
	};
};

module.exports = questionSchema;