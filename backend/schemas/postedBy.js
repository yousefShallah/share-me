export default {
    name: "postedBy",
    title: "PostedBy",
    type: "reference",
    to: [ { type: "user" } ],

    fields: [
        {
            name: "postedBy",
            title: "PostedBy",
            type: "postedBy"
        },
        {
            name: "userId",
            title: "UserId",
            type: "string"
        },
    ]
}