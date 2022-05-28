//Configure all Errors messages


// 0 - Message simple
// 1 - Message sans error
// 3 - Toutes les informations


class AllErrors extends Error {
    constructor(errorMessage, errorType = '') {
        super()
        this.name = this.constructor.name;
        this.message = errorMessage;
        switch (this.constructor.name) {
            case 'AuthentificationError':
                if (errorType == 0) {
                    this.statusCode = 400;
                } else if (errorType == 1) {
                    this.statusCode = 404;
                } else {
                    this.statusCode = 401
                }
                break

            case 'UserError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409;
                break

            case 'PostError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409;
                break

            case 'CommentError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409;
                break

            case 'LikeError':
                errorType == 0 ? this.statusCode = 404 : this.statusCode = 409;
                break

            case 'RequestError':
                this.statusCode = 400
                break
            default:
                console.log('No Handler for that')
        }

    }
}

class AuthentificationError extends AllErrors { }
class UserError extends AllErrors { }
class PostError extends AllErrors { }
class RequestError extends AllErrors { }

module.exports = { AllErrors, AuthentificationError, UserError, PostError, RequestError }

