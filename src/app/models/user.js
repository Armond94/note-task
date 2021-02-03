import { compareSync } from 'bcryptjs';

export default (mongoose) => {
    let UserSchema = mongoose.Schema({
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
            email: { type: String, lowercase: true, required: true, index: true, unique: true },
            password: { type: String },
            createdAt: Date,
            updatedAt: Date,
        });

    UserSchema.pre('save', function(next) {
        const now = new Date();
        this.updatedAt = now;

        if (!this.createdAt) {
            this.createdAt = now;
        }
        next();
    });

    UserSchema.methods = {
        comparePassword: function checkUserPassword(pw) {
            return this.password && compareSync(pw, this.password);
        },
    };

    return mongoose.model('User', UserSchema);
};
