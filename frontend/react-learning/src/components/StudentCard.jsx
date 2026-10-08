function StudentCard({ name, course, age }) {
    return (
        <div>
            <p>{name}</p>
            <p>{course}</p>
            <p>{age}</p>
        </div>
    );
}

export default StudentCard;