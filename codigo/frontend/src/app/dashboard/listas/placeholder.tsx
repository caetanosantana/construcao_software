export default function palceholder(){

    const [inputValue,setInputValue] = useState('');

    return (
        <input
            type="text"
            value = {inputValue}
            onChange = {(e) => setInputValue(e.target.value)}
        />
    )
}