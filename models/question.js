var questionSchema = function (data){
	return {
		question_number: data.question_number,
		answer: data.answer
	};
};

module.exports = questionSchema;