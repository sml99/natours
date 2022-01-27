class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        let queryObj = { ...this.queryString };
        //Filtering: excluded fields
        ['page', 'sort', 'limit', 'fields'].forEach((el) => delete queryObj[el]);
        //More Filtering: lte => $lte
        queryObj = JSON.parse(JSON.stringify(queryObj).replace(/\b((g|l)t[e]?)\b/g, '$$$1'));
        this.query = this.query.find(queryObj);
        return this;
    }

    sort() {
        //Sorting
        const sortBy = this.queryString.sort ? this.queryString.sort.split(',').join(' ') : '-createdAt';
        this.query = this.query.sort(sortBy);
        return this;
    }

    limitFields() {
        //Field limiting
        const fields = this.queryString.fields ? this.queryString.fields.split(',').join(' ') : '-__v';
        this.query = this.query.select(fields);
        return this;
    }

    paginate() {
        //Pagination
        const page = this.queryString.page || 1;
        const limit = this.queryString.limit || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = APIFeatures;
