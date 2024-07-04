from importation import (pd, np, Pipeline, 
                                StandardScaler, FunctionTransformer, 
                                MultiLabelBinarizer, ColumnTransformer, 
                                SimpleImputer, BaseEstimator, 
                                TransformerMixin, NearestNeighbors)



def fetch_data_parquet():
    df = pd.read_parquet(r'C:\Users\dimle\Documents\clone_repo\HackathonWCS\ML\user_info.parquet')

    return df


def model_knn_module(df:pd.DataFrame, id_user:int, preprocessor:Pipeline)->tuple[int]:
    """
    Entraîne un modèle KNN pour trouver les mentor les plus proches

    Args:
        df (pd.DataFrame): Le DataFrame contenant les données des mentor et mentoré.
        id_user (int): L'id de l'utilisateur recherchant un mentor
        preprocessor: Le préprocesseur utilisé pour transformer les données.

    Returns:
        tupples: tupple retournant les 3 id des utilisateurs ayant le statut de mentor
    """

    # Défintion du model
    KNNmodel = NearestNeighbors(n_neighbors= 4, algorithm= "auto")

    # Combinaison du preprocessing et du model
    pipeline_with_knn = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('knn', KNNmodel)
    ])

    # entarinement du model
    pipeline_with_knn.fit(df)

    
    
    #recuperation des information du user selectionné
    query_features = df[df['id_user'] == id_user].drop(columns=['id_user'], axis=1)

    # infos transformé sur le film selectionné
    query_features_processed = pipeline_with_knn.named_steps['preprocessor'].transform(query_features)

    # utilisation du model knn plus proche voisin du film -> recup des indiczes des films
    id_knn = pipeline_with_knn.named_steps['knn'].kneighbors(query_features_processed, return_distance= False)

    # recuperation des infos par rapprot au id trouvés par le model knn
    df_knn = df.iloc[id_knn[0]]



    return df_knn.reset_index()


df = fetch_data_parquet()

print(df)