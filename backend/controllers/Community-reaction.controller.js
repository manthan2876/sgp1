

const Reaction = require('../models/Community-Reaction.model');
const Post = require('../models/Community-post.model'); // Correct path

// Like or dislike a post
const reactToPost = async (req, res) => {
    console.log("reactToPost called"); // Debugging log
    try {
        const { postId, reactionType } = req.body;

        if (!["like", "dislike"].includes(reactionType)) {
            return res.status(400).json({ message: "Invalid reaction type" });
        }

        const existingReaction = await Reaction.findOne({
            postId,
            userId: req.user._id,
        });

        // If a reaction exists already
        if (existingReaction) {
            if (existingReaction.reactionType === reactionType) {
                // If it's the same reaction, remove it (decrement count)
                await existingReaction.deleteOne();

                // Decrement the count on the post
                const post = await Post.findById(postId);
                if (post) {
                    post[reactionType === "like" ? "likesCount" : "dislikesCount"]--;
                    await post.save();
                }

                return res.status(200).json({ message: `${reactionType} removed` });
            } else {
                // If it's a different reaction, update it
                existingReaction.reactionType = reactionType;
                await existingReaction.save();

                // Adjust the post's counts
                const post = await Post.findById(postId);
                if (post) {
                    // Update the like and dislike counts
                    if (reactionType === "like") {
                        post.likesCount++;
                        post.dislikesCount--;
                    } else {
                        post.dislikesCount++;
                        post.likesCount--;
                    }
                    await post.save();
                }

                return res.status(200).json({ message: `${reactionType} updated` });
            }
        }

        // If no existing reaction, add a new one
        const newReaction = new Reaction({
            postId,
            userId: req.user._id,
            reactionType,
        });
        await newReaction.save();

        // Update the count on the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post[reactionType === "like" ? "likesCount" : "dislikesCount"]++;
        await post.save();

        res.status(201).json({ message: `${reactionType} added` });
    } catch (error) {
        console.error("Error in reactToPost:", error); // Debugging log for error
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    reactToPost,
};

