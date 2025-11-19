export const userApiDocs = {
    "/api/users/login": {
        post: {
            tags: ["Users"],
            summary: "Login user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                userName: { type: "string", example: "admin" },
                                password: { type: "string", example: "admin123" },
                            },
                            required: ["userName", "oldPassword", "newPassword"],
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Login successful, returns a token",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    message: { type: "string", example: "success" },
                                    token: {
                                        type: "string",
                                        example:
                                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk1NzY3MzYwfQ.Hx-NhsfsdfsdFjG3Zk"
                                    }
                                }
                            }
                        }
                    }
                },
                500: { description: "Error" },
            },
        }
    },
    "/api/users/getusers": {
        get: {
            tags: ["Users"],
            summary: "Get all users",
            responses: {
                200: {
                    description: "Get all users",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        id: { type: "integer", description: "User ID", example: 1 },
                                        user_name: { type: "string", description: "Name of user", example: "JohnDoe" },
                                        uid: { type: "integer", description: "Id of admin", example: 1 },
                                        contact_info: { type: "string", description: "Contact information", example: "123456789" },
                                        created_at: { type: "string", description: "Created date and time", example: "2025-07-21T05:55:35.000Z" },
                                        is_active: { type: "bool", description: "Current state of user", example: true }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    },
    "/api/users/createuser": {
        post: {
            tags: ["Users"],
            summary: "Create a new user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                userName: { type: 'string', example: "admin" },
                                password: { type: 'string', example: "admin" },
                                role: { type: 'string', example: 'admin' },
                                contact_info: { type: "string", example: "123456789" },
                            },
                            required: ["userName", "password", "uid"]
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                },
                500: {
                    description: "Error",
                }
            }
        }
    },
    "/api/users/resetpassword/admin": {
        post: {
            tags: ["Users"],
            summary: "Reset password by admin",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                userName: { type: 'string', example: "user@123" },
                                newPassword: { type: 'string', example: "user123" },
                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                },
                500: {
                    description: "Error",
                }
            }
        }
    },
    "/api/users/resetpassword/user": {
        post: {
            tags: ["Users"],
            summary: "Reset password by user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                userName: { type: 'string', example: 'user@123' },
                                oldPassword: { type: 'string', example: "pass123" },
                                newPassword: { type: 'string', example: "test123" },

                            }
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Success",
                },
                500: {
                    description: "Error",
                }
            }
        }
    },
    "/api/users/updateuser": {
        post: {
            tags: ["Users"],
            summary: "Update user",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                userName: { type: 'string', example: 'user@123' },
                                contact: { type: "string", example: "1234" },
                                isActive: { type: "string", example: "false" }
                            }
                        }
                    }
                }
            }
        }
    }
}