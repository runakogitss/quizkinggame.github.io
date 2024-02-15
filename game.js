const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0 
let questionCounter = 0
let availableQuestions = []
let correctAnswerText = ''

let questions = [
    {
        question: 'Berikut ini merupakan komoditas Jalur Sutera, kecuali..',
        choice1: 'Budak', 
        choice2: 'Emas',
        choice3: 'Rempah-Rempah',
        choice4: 'Kain Sutera',
        answer: 2,
    },
    {
        question: 'Menurut teori R.C. Majundar, mengapa munculnya kerajaan Hindu-Budha di Indonesia dikaitkan dengan kaum ksatria dari India?',
        choice1: 'Adanya konflik antar kerajaan di India yang mendorong ksatria dan raja melarikan diri ke Indonesia.', 
        choice2: 'Kebijakan perdagangan yang menguntungkan antara India dan Indonesia',
        choice3: 'Karena para ksatria di Indonesia mengundang ksatria India untuk memperkuat pertahanan.',
        choice4: 'Terdapat bukti kuat bahwa raja-raja di Nusantara berasal dari India',
        answer: 1,
    },
    {
        question: 'Makna lukisan seorang naik perahu disertakan dengan kubur seseorang pada masa prasejarah di Kepulauan Indonesia adalah?',
        choice1: 'Lukisan tersebut adalah kehidupan sehari-hari orang yang meninggal.', 
        choice2: 'Lukisan tersebut mewakili kehidupan sesudah mati sebagai tubuh fisik.',
        choice3: 'Lukisan tersebut memberikan makna bahwa roh orang yang meninggal akan melanjutkan perjalanan ke alam baka.',
        choice4: 'Lukisan tersebut hanya sebagai hiasan tanpa makna filosofis.',
        answer: 3,
    },
    {
        question: 'Salah satu karakteristik utama dalam bentuk bangunan candi di Indonesia menurut teks adalah..',
        choice1: 'Unsur-unsur budaya Hindu-Buddha yang murni', 
        choice2: 'Patung-patung perwujudan dewa atau Buddha yang berasal dari India',
        choice3: 'Bangunan megah yang tidak memiliki pengaruh budaya lokal',
        choice4: 'Punden berundak yang mencerminkan unsur Indonesia asli.',
        answer: 4,
    },
    {
        question: 'Dengan dipindahnya jalur sutera ke Jalur Laut melalui Selat Malaka, mengapa masyarakat di Indonesia diuntungkan?',
        choice1: 'Karena situasi jalan darat semakin aman di Indonesia.', 
        choice2: 'Karena Indonesia menjadi daerah transit bagi pedagang Cina dan India.',
        choice3: 'Karena jalur sutera tidak lagi melibatkan Indonesia dalam perdagangan.',
        choice4: 'Karena perdagangan di Indonesia hanya melibatkan Eropa',
        answer: 2,
    },
    {
        question: 'Proses masuknya Teori Waisya disebabkan oleh?',
        choice1: 'Disebabkan oleh pedagang India dengan angin musim untuk berdagang.', 
        choice2: 'Disebabkan oleh para peranan kaum ksatria dari India.',
        choice3: 'Disebabkan karena pengaruh dari kaum Brahmana.',
        choice4: 'Disebabkan oleh banyak pemuda Indonesia belajar ke India.',
        answer: 1,
    },
    {
        question: 'Salah satu bukti dari Teori Brahmana adalah?',
        choice1: 'Adanya Kampung keling di beberapa daerah Indonesia.', 
        choice2: 'Terdapat sisa peninggalan kerajaan bercorak Hindu-Buddha menggunakan Bahasa Sansekerta dan Pallawa',
        choice3: 'Terdapat informasi dari Prasasti Nalanda.',
        choice4: 'Dari hipotesis cerita panji yang berkembang di Indonesia.',
        answer: 2,
    },
    {
        question: 'Mengapa akulturasi kebudayaan memerlukan keseimbangan antara kedua kebudayaan yang berakulturasi?',
        choice1: 'Supaya kebudayaan baru memiliki identitas unik.', 
        choice2: 'Untuk menjaga keseimbangan antara kedua kebudayaan.',
        choice3: 'Agar kebudayaan asli tidak terpengaruh.',
        choice4: 'Untuk menghilangkan identitas kebudayaan yang ada.',
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    
    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
    
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

if (classToApply === 'incorrect') {
    // Add a new div element with the class "explanation" inside the selected choice's parent element
    const explanationElement = document.createElement('div');
    explanationElement.className = 'explanation';

    // Set the text of the explanation element to the correct answer
    explanationElement.innerText = `Correct answer: ${currentQuestion['choice' + currentQuestion.answer]}`;

    // Add the explanation element to the selected choice's parent element
    selectedChoice.parentElement.appendChild(explanationElement);
} else {
    incrementScores(SCORE_POINTS);
}

selectedChoice.parentElement.classList.add(classToApply);

setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply);

    // Remove the explanation element after 1 second
    const explanationElement = selectedChoice.parentElement.querySelector('.explanation');
    if (explanationElement) {
        explanationElement.remove();
    }
    getNewQuestion();

}, 1000);
    })
})

incrementScores = num => {
    score +=num
    scoreText.innerText = score
}

startGame()