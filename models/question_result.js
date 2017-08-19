var question_result = function (data){
	return {
		question_number: data.question_number,
		correct: data.correct,
		wrong_part: data.wrong_part,
		submitted_answer: data.submitted_answer
	};
};

module.exports = question_result;