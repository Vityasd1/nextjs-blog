import React,{useState,useEffect,useRef} from 'react';
import {comment} from "postcss";
import {submitComment} from "../services";

export const CommentsForm = ({slug}) => {

    const [error, setError] = useState(false);
    const [localStorage, setLocalStorage] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const commentEl = useRef();
    const emailEl = useRef();
    const nameEl = useRef();
    const storeDataEl = useRef();

    const handleCommentSubmittion = () => {
        setError(false);
        const {value: comment} = commentEl.current;
        const {value: name} = nameEl.current;
        const {value: email} = emailEl.current;
        const {checked: storeData} = storeDataEl.current;
        if(!comment || !name || !email){
            setError(true);
            return;
        }
        const commentObj = {
            name,
            email,
            comment,
            slug
        }
        if(storeData) {
            window.localStorage.setItem('name', name);
            window.localStorage.setItem('email', email);
        }else{
            window.localStorage.removeItem('name', name);
            window.localStorage.removeItem('email', email);
        }

        submitComment(commentObj)
            .then((res) => {
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                },3000)
            });
    }

    useEffect(() => {
       nameEl.current.value = window.localStorage.getItem('name');
       emailEl.current.value = window.localStorage.getItem('email');
    }, []);



    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Hagyj egy üzit!</h3>
            <div className="grid grid-cols-1 gap-4 mb-4 ">
                <textarea
                    ref={commentEl}
                    placeholder="Comment"
                    name="comment"
                    className="py-2 outline-none p-4 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"></textarea>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ">
                <input type="text" ref={nameEl}
                       placeholder="Name"
                       name="name"
                       className="py-2 outline-none p-4 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
                <input type="text" ref={emailEl}
                       placeholder="Email"
                       name="email"
                       className="py-2 outline-none p-4 w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700"/>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-4 ">
                <div>
                    <input type="checkbox" id={"storeData"} name={"storeData"} ref={storeDataEl}/>
                    <label className="cursor-pointer text-gray-500 ml-2" htmlFor={"storeData"}>Elmentem a nevet és az emailt a következő üzenetekhez</label>
                </div>
            </div>
            {error && (
                <p className="text-xs text-red-500">Minden mező kötelező.</p>
            )}
            <div className="mt-8">
                <button
                    type={"button"}
                    onClick={handleCommentSubmittion}
                    className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer"
                >Küldés</button>
            </div>
            {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Elküldve ellenőrzésre.</span>}
        </div>
    );
};


