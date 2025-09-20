document.addEventListener('DOMContentLoaded', function () {
    const classCards = document.querySelectorAll('.class-card');
    const studentsContainer = document.getElementById('studentsContainer');
    const studentsTableBody = document.getElementById('studentsTableBody');
    const selectedClassSpan = document.getElementById('selectedClass');
    const closeBtn = document.getElementById('closeStudents');

    const studentsData = {
        6: [
            { name: 'Emma Johnson', id: 'STU00601', mobile: '9876543210', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 11 year old girl with brown hair&id=stu6-1' },
            { name: 'Noah Williams', id: 'STU00602', mobile: '9876543211', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 11 year old boy with black hair&id=stu6-2' },
            { name: 'Olivia Brown', id: 'STU00603', mobile: '9876543212', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 12 year old girl with blonde hair&id=stu6-3' },
            { name: 'Liam Jones', id: 'STU00604', mobile: '9876543213', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 11 year old boy with red hair&id=stu6-4' },
            { name: 'Ava Garcia', id: 'STU00605', mobile: '9876543214', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 12 year old girl with curly hair&id=stu6-5' }
        ],
        7: [
            { name: 'William Miller', id: 'STU00701', mobile: '9876543220', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 13 year old boy with glasses&id=stu7-1' },
            { name: 'Sophia Davis', id: 'STU00702', mobile: '9876543221', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 12 year old girl with braided hair&id=stu7-2' },
            { name: 'Mason Rodriguez', id: 'STU00703', mobile: '9876543222', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 13 year old boy with short hair&id=stu7-3' },
            { name: 'Isabella Martinez', id: 'STU00704', mobile: '9876543223', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 12 year old girl with smiling face&id=stu7-4' },
            { name: 'James Hernandez', id: 'STU00705', mobile: '9876543224', avatar: 'https://placeholder-image-service.onrender.com/image/40x40?prompt=Portrait of a 13 year old boy with freckles&id=stu7-5' }
        ]
        // Add more classes & students as needed
    };

    classCards.forEach(card => {
        card.addEventListener('click', function () {
            const classNumber = this.getAttribute('data-class');
            showStudents(classNumber);
        });
    });

    closeBtn.addEventListener('click', function () {
        studentsContainer.classList.remove('active');
    });

    function showStudents(classNumber) {
        selectedClassSpan.textContent = classNumber;
        studentsTableBody.innerHTML = '';
        const students = studentsData[classNumber] || [];
        students.forEach(student => {
            const studentRow = document.createElement('tr');
            studentRow.innerHTML = `
                <td>
                    <div class="student-name">
                        <img src="${student.avatar}" alt="Portrait of ${student.name}" class="student-avatar" />
                        ${student.name}
                    </div>
                </td>
                <td><span class="student-id">${student.id}</span></td>
                <td>${student.mobile}</td>
            `;
            studentsTableBody.appendChild(studentRow);
        });
        studentsContainer.classList.add('active');
        studentsContainer.scrollIntoView({ behavior: 'smooth' });
    }
});