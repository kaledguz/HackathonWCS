import pandas as pd


from sklearn.pipeline import Pipeline
from sklearn.preprocessing import  MultiLabelBinarizer, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.neighbors import NearestNeighbors




def fetch_data_parquet(path_parquet:str)-> pd.DataFrame:
    
    df = pd.read_parquet(path_parquet)

    return df



def prepa_transformer_bool()->Pipeline:

    # Préparation du pipeline pour la transformation logarithmique et la standardisation des caractéristiques numériques
    numeric_transformer_log_std = (Pipeline( steps= [
        # ('imputer', SimpleImputer(strategy='most_frequent')),
        ('encoder', OneHotEncoder(drop='if_binary', dtype=int))
    ]))

    return numeric_transformer_log_std



    
def prepa_transformer_multiBin()->Pipeline:
    """
    Prépare le transformateur pour la transformation des caractéristiques catégorielles en utilisant MultiLabelBinarizer.

    Returns:
        Pipeline: Pipeline contenant les étapes de transformation pour MultiLabelBinarizer.
    """

    # Create a custom transformer using MultiLabelBinarizer
    class CustomMultiLabelBinarizer(BaseEstimator, TransformerMixin):
        def __init__(self):
            self.mlb = MultiLabelBinarizer(sparse_output= True)
        def fit(self, X, y=None):
            self.mlb.fit(X)
            return self
        def transform(self, X):
            return self.mlb.transform(X)

    # Préparation du pipeline pour la transformation des caractéristiques catégorielles en utilisant MultiLabelBinarizer
    category_list_transformer_multibinary = (Pipeline( steps= [
        ('Multi_bin', CustomMultiLabelBinarizer())
    ]))

    return category_list_transformer_multibinary





def preprocessor(features_bool:list[str], features_cat_list:list[str])-> Pipeline:
    """
    Prépare le préprocesseur pour les caractéristiques standardisées, logarithmiques et catégorielles.

    Args:
        features_bool (booleen): 
        features_cat_list (list): Liste des caractéristiques catégorielles.

    Returns:
        Pipeline: Pipeline contenant les étapes de prétraitement pour les caractéristiques.
    """

    # Préparation des transformateurs pour les caractéristiques numériques
    category_list_transformer_bool = prepa_transformer_bool()

    # Préparation du transformateur pour les caractéristiques catégorielles
    category_list_transformer_multibinary = prepa_transformer_multiBin()

    # création de la liste des tuples pour la transformation en multiLabelBinarizer
    list_tuple = []
    for id, features_cat in enumerate(features_cat_list):
        list_tuple.append((f'cat_multiB{id}', category_list_transformer_multibinary, features_cat))
        

    # Combinaison des transformation pour le preprocessing
    preprocessor = ColumnTransformer(
        transformers= [
            ('num_bol', category_list_transformer_bool, features_bool)
        ] + list_tuple
    )

    return preprocessor





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


    df_mentor = df[df['mentor'] == True]
    df_search = df[(df['id_login_user'] == id_user)]

    df_knn = pd.concat([df_mentor, df_search], ignore_index=True)

    # entarinement du model
    pipeline_with_knn.fit(df_knn)
    
    #recuperation des information du user selectionné
    query_features = df_search.drop(columns=['id_login_user'], axis=1)


    # infos transformé sur le user selectionné
    query_features_processed = pipeline_with_knn.named_steps['preprocessor'].transform(query_features)

    # utilisation du model knn plus proche voisin  
    id_knn = pipeline_with_knn.named_steps['knn'].kneighbors(query_features_processed, return_distance= False)

    # recuperation des infos par rapprot au id trouvés par le model knn
    df_knn = df_knn.iloc[id_knn[0]]

    result_tuple = tuple(df_knn['id_login_user'].iloc[1:].to_list())

    print(result_tuple)

    return result_tuple


def api_ml(id_user:int, preprocessor:Pipeline=preprocessor)->tuple[int]:
    
    path_parquet = r'C:\Users\dimle\Documents\clone_repo\HackathonWCS\ML\user_info_clean.parquet'

    df = fetch_data_parquet(path_parquet)

    df['id_mentorat'] = df['id_mentorat'].astype(str)
    df['id_mentor'] = df['id_mentor'].astype(str)
    df['id_mentorat'] = df['id_mentorat'].astype(str)

    features_bool = ['lgbt', 'handicap']

    # features_cat_list = ['id_login_user', 'sexe', 'type_handicap', 'niveau_professionnel','categorie_socio_professionnelle', 'id_mentorat', 'id_mentor', 'type_mentorat', 'id_sujet']
    features_cat_list = ['sexe', 'type_handicap', 'niveau_professionnel', 'id_mentorat']

    # Génération du preprocessing
    preprocessor = preprocessor(features_bool, features_cat_list)

    # insertion du module de proche voisin --> dataframe resultat avec les 5 recomandations
    result = model_knn_module(df, id_user, preprocessor)

    return result



'''
Lancement du api_ml pour recherche proche voisin
'''
api_ml(2380)