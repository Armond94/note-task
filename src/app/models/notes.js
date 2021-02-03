export default (mongoose) => {
    let NoteSchema = mongoose.Schema({
        title: { type: String, required: true },
        content: { type: String, required: true },
        labels: [{ type: String, required: true }],
        images: [ { type: String } ],
        owner: { type: mongoose.Schema.Types.ObjectId },
        createdAt: Date,
        updatedAt: Date
    });

    NoteSchema.pre('save', function(next) {
        const now = new Date();

        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }

        next();
    });

    return mongoose.model('Note', NoteSchema);
};
