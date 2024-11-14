document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("comment-text");
    const charCount = document.getElementById("char-count");
    const postCommentButton = document.getElementById("post-comment");
    const commentsContainer = document.getElementById("comments-container");
    commentInput.addEventListener("input", function () {
        const currentLength = commentInput.value.length;
        charCount.textContent = `${currentLength}/250`;
    });
    postCommentButton.addEventListener("click", function () {
        const commentText = commentInput.value.trim();

        if (commentText.length > 0 && commentText.length <= 250) {
            const newComment = createComment(commentText);
            commentsContainer.appendChild(newComment);
            commentInput.value = ''; 
            charCount.textContent = '0/250'; 
        }
    });

    function createComment(commentText, parentId = null) {
        const commentId = Date.now(); 
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment", "bg-white", "p-4", "rounded-lg", "shadow-md", "mb-4", "relative", "border-l-4", "border-blue-500");
        const content = document.createElement("p");
        content.textContent = commentText;
        content.classList.add("text-gray-700");
        commentDiv.appendChild(content);
        const replyButton = document.createElement("button");
        replyButton.classList.add("text-blue-500", "underline", "mt-2", "text-sm");
        replyButton.textContent = "Reply";
        replyButton.addEventListener("click", function () {
            toggleReplyForm(commentId);
        });
        commentDiv.appendChild(replyButton);
        const replyForm = document.createElement("div");
        replyForm.classList.add("reply-form", "hidden", "mt-4");
        const replyInput = document.createElement("textarea");
        replyInput.classList.add("w-full", "p-3", "border", "border-gray-300", "rounded-md", "resize-none");
        replyInput.setAttribute("maxlength", "250");
        replyInput.setAttribute("placeholder", "Write a reply...");

        const replyCharCount = document.createElement("span");
        replyCharCount.classList.add("text-sm", "text-gray-500", "block", "mt-2");
        replyCharCount.textContent = "0/250";

        const submitReplyButton = document.createElement("button");
        submitReplyButton.classList.add("bg-blue-500", "text-white", "px-4", "py-2", "rounded-md", "mt-2");
        submitReplyButton.textContent = "Post Reply";
        submitReplyButton.addEventListener("click", function () {
            const replyText = replyInput.value.trim();
            if (replyText.length > 0 && replyText.length <= 250) {
                const replyComment = createComment(replyText, commentId);
                addReplyToComment(replyComment, commentId);
                replyInput.value = '';
                replyCharCount.textContent = "0/250";
                replyForm.classList.add("hidden");  
            }
        });

        replyInput.addEventListener("input", function () {
            const currentLength = replyInput.value.length;
            replyCharCount.textContent = `${currentLength}/250`;
        });

        replyForm.appendChild(replyInput);
        replyForm.appendChild(replyCharCount);
        replyForm.appendChild(submitReplyButton);
        if (parentId) {
            const parentComment = document.getElementById(`comment-${parentId}`);
            let repliesContainer = parentComment.querySelector(".replies-container");
            if (!repliesContainer) {
                repliesContainer = document.createElement("div");
                repliesContainer.classList.add("replies-container", "pl-6", "mt-4");
                parentComment.appendChild(repliesContainer);
            }
            repliesContainer.appendChild(commentDiv);
        } else {
            commentsContainer.appendChild(commentDiv);
        }
        commentDiv.appendChild(replyForm);
        commentDiv.setAttribute("id", `comment-${commentId}`);

        return commentDiv;
    }
    function toggleReplyForm(commentId) {
        const commentDiv = document.getElementById(`comment-${commentId}`);
        const replyForm = commentDiv.querySelector(".reply-form");
        replyForm.classList.toggle("hidden");
    }

    function addReplyToComment(replyComment, commentId) {
        const parentComment = document.getElementById(`comment-${commentId}`);
        let repliesContainer = parentComment.querySelector(".replies-container");
        if (!repliesContainer) {
            repliesContainer = document.createElement("div");
            repliesContainer.classList.add("replies-container", "pl-6", "mt-4");
            parentComment.appendChild(repliesContainer);
        }
        repliesContainer.appendChild(replyComment);
    }
});
