const {DB_USERNAME, DB_PASSWORD} = process.env;
// export const connection = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zqsisng.mongodb.net/?retryWrites=true&w=majority`;

export const connection = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.zqsisng.mongodb.net/bhagavadgita?retryWrites=true&w=majority&appName=Cluster0`;
