export type BodyDQLEndpointProperty = {
    
    /**
     * The name of the property
     *
     * @type {string}
     */
    name?: string;
    
    /**
     * The type of the property
     *
     * @type {*}
     */
    type: any;
    
    /**
     *
     *
     * @type {boolean}
     */
    required?: boolean;
    

   /**
    *
    *
    * @type {{ [id: string]: string[]; }}
    */
   errors?: { [id: string]: string[]; };
};
