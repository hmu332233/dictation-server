var grade_detail = function (data){
	return {
		question_number: data.question_number,
		correct: data.correct,
		reason: data.reason
	};
};

module.exports = grade_detail;