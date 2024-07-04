import pandas as pd 
from faker import Faker
import random
from datetime import timedelta
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

sujets_par_critere = {
    "sexe": {
        "Male": [
            "Développement de carrière dans l'ingénierie",
            "Leadership dans le secteur financier",
            "Technologies émergentes pour hommes dans le secteur IT",
        ],
        "Female": [
            "Équilibre travail-vie personnelle dans la haute direction",
            "Innovation et entrepreneuriat pour femmes",
            "Mentorat pour les femmes dans le secteur médical",
        ],
        "Transgender Male": [
            "Carrières dans la diversité et l'inclusion pour hommes transgenres",
            "Succès professionnel pour les hommes transgenres dans le secteur créatif",
        ],
        "Transgender Female": [
            "Leadership et empowerment pour femmes transgenres",
            "Développement de carrière dans l'industrie de la technologie pour femmes transgenres",
        ],
        "Non_binary": [
            "Inclusivité dans les start-ups technologiques",
            "Carrières non traditionnelles pour personnes non-binaires",
        ],
        "Genderqueer": [
            "Stratégies de carrière pour les personnes genderqueer",
            "Réussite professionnelle en tant que genderqueer dans le secteur éducatif",
        ],
        "Genderfluid": [
            "Adaptation des carrières pour les personnes genderfluid",
            "Succès professionnel en tant que genderfluid dans le domaine de l'art",
        ],
        "Intersex": [
            "Inclusion et respect dans le milieu professionnel pour personnes intersexuées",
            "Évolution des politiques de ressources humaines pour personnes intersexuées",
        ],
        "Agender": [
            "Carrières et réussite professionnelle pour personnes agender",
            "Réseautage et support pour personnes agender dans le secteur de l'ingénierie",
        ],
    },
    
    "handicap": {
        True: [
            "Surmonter les défis professionnels avec un handicap visuel",
            "Accessibilité et inclusion dans l'enseignement supérieur",
            "Stratégies pour le succès dans les carrières pour personnes handicapées physiques",
        ],
        False: [
            "Stratégies pour la croissance professionnelle rapide",
            "Réseautage efficace pour les professionnels",
            "Innovation et leadership dans le secteur technologique",
        ],
    },
    
    "niveau_professionnel": {
        "Étudiant": [
            "Transition de l'université à la carrière",
            "Développement de compétences clés pour l'entrée dans le marché du travail",
            "Conseils pour les stages et les premières expériences professionnelles",
        ],
        "Jeune diplômé": [
            "Lancement de carrière réussi dans le secteur IT",
            "Réussir les premières années dans l'industrie de la mode",
            "Stratégies pour négocier son premier emploi",
        ],
        "Actif": [
            "Gestion du stress pour les cadres supérieurs",
            "Leadership et gestion d'équipe dans les PME",
            "Développement personnel pour une meilleure efficacité professionnelle",
        ],
        "Senior": [
            "Préparation à la retraite et engagement communautaire",
            "Consultation indépendante pour professionnels expérimentés",
            "Santé et bien-être pour les seniors actifs",
        ],
    },
    
    "categorie_socio_pro": {
        "Agriculteur": [
            "Innovation technologique dans l'agriculture durable",
            "Stratégies de commercialisation pour les petites exploitations",
            "Formation continue pour les jeunes agriculteurs",
        ],
        "Artisan": [
            "Transition numérique pour les métiers d'artisanat traditionnels",
            "Mise en valeur du patrimoine culturel par l'artisanat",
            "Réseautage pour artisans et créateurs",
        ],
        "Cadre": [
            "Leadership transformationnel dans les grandes entreprises",
            "Stratégies pour la diversité et l'inclusion dans la haute direction",
            "Développement professionnel pour cadres en milieu compétitif",
        ],
        "Commerçant": [
            "Stratégies de commerce électronique pour les PME",
            "Adaptation au changement dans le secteur de la vente au détail",
            "Développement de compétences pour les propriétaires de petites entreprises",
        ],
        "Employé": [
            "Développement de carrière pour les employés de bureau",
            "Promotion de la santé mentale en milieu de travail",
            "Gestion de la diversité dans les environnements de travail",
        ],
        "Étudiant": [
            "Planification de carrière pour les étudiants internationaux",
            "Réussir en tant qu'étudiant entrepreneur",
            "Soutien aux étudiants dans la transition universitaire",
        ],
        "Profession libérale": [
            "Stratégies de croissance pour les cabinets d'avocats",
            "Développement personnel pour les consultants indépendants",
            "Conseils pratiques pour les entrepreneurs individuels",
        ],
        "Ouvrier": [
            "Amélioration de la sécurité au travail dans l'industrie",
            "Développement professionnel pour les travailleurs manuels",
            "Formation continue pour les métiers spécialisés",
        ],
        "Retraité": [
            "Engagement communautaire après la retraite",
            "Voyages et loisirs pour les retraités actifs",
            "Activités pour maintenir la santé et le bien-être après la retraite",
        ],
        "Sans activité professionnelle": [
            "Bénévolat et engagement social",
            "Activités créatives pour la retraite",
            "Soutien aux seniors dans les soins de santé et le bien-être",
        ],
    },
}

def check_connection(**kwargs) -> bool:
    try:
        connection = mysql.connector.connect(**kwargs)
        if connection.is_connected():
            print("Connection established")
            connection.close()
            return True
        else:
            print("Connection failed")
            return False
    except Error as e:
        print(f"Error: {e}")
        return False

def if_table_is_empty(table_name: str, **kwargs) -> bool:
    try:
        with mysql.connector.connect(**kwargs) as connection:
            with connection.cursor() as cursor:
                cursor.execute(f"SELECT EXISTS(SELECT 1 FROM {table_name} LIMIT 1)")
                result = cursor.fetchone()
                return result[0] == 0
    except Error as e:
        print(f"Error: {e}")
        return False

def populate_login_user_and_user_info(n_users: int, fake: Faker, **kwargs) -> tuple[list, list]:
    login_user_insert_query = """
    INSERT INTO login_user (email, mot_de_passe)
    VALUES (%s, %s)"""
    
    user_info_insert_query = """
    INSERT INTO user_info (id_user_info, prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, 
                           niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
    
    mentors = []
    mentees = []
    try:
        with mysql.connector.connect(**kwargs) as connection:
            with connection.cursor() as cursor:
                for _ in range(n_users):
                    email = fake.email()
                    mot_de_passe = fake.password()
                    
                    cursor.execute(login_user_insert_query, (email, mot_de_passe))
                    id_login_user = cursor.lastrowid

                    prenom = fake.first_name()
                    nom = fake.last_name()
                    sexe = random.choice(["Male", "Female", "Transgender Male", "Transgender Female", "Non_binary", "Genderqueer", "Genderfluid", "Intersex", "Agender"])
                    age = random.randint(18, 65)
                    mentor = random.choice([True, False])
                    lgbt = random.choice(["Yes", "No"])
                    handicap = random.choice([True, False])
                    type_handicap = random.choice(['Visuel', 'Auditif', 'Physique', 'Mental', 'Autre']) if handicap else None
                    niveau_professionnel = random.choice(['Étudiant', 'Jeune diplômé', 'Actif', 'Senior'])
                    categorie_socio_professionel = random.choice(['Agriculteur', 'Artisan', 'Cadre', 'Commerçant', 'Employé', 'Étudiant', 'Profession libérale', 'Ouvrier', 'Retraité', 'Sans activité professionnelle'])
                    nombre_de_participation = random.randint(0, 20)

                    cursor.execute(user_info_insert_query, (id_login_user, prenom, nom, sexe, age, mentor, lgbt, handicap, type_handicap, 
                                                            niveau_professionnel, categorie_socio_professionel, nombre_de_participation, id_login_user))

                    if mentor:
                        mentors.append(id_login_user)
                    else:
                        mentees.append(id_login_user)
                
                connection.commit()
    
    except Error as e:
        print(f"Error: {e}")
    
    return mentors, mentees

def populate_sujet(n_sujets: int, fake: Faker, mentors: list, mentees: list, **kwargs) -> None:
    if if_table_is_empty("sujet", **kwargs):
        insert_query = """
        INSERT INTO sujet (id_mentorat, id_utilisateur_mentor, id_utilisateur_mentoret, sujet_du_mentorat)
        VALUES (%s, %s, %s, %s)"""
        
        try:
            with mysql.connector.connect(**kwargs) as connection:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT id_mentorat FROM mentorat")
                    mentorat_ids = [row[0] for row in cursor.fetchall()]

                    if not mentorat_ids:
                        raise ValueError("The mentorat table is empty.")
                    
                    data = []
                    for _ in range(n_sujets):
                        id_mentorat = random.choice(mentorat_ids)
                        id_utilisateur_mentor = random.choice(mentors)
                        id_utilisateur_mentoret = random.choice(mentees)
                        sexe = random.choice(list(sujets_par_critere["sexe"].keys()))
                        handicap = random.choice([True, False])
                        niveau_professionnel = random.choice(list(sujets_par_critere["niveau_professionnel"].keys()))
                        categorie_socio_pro = random.choice(list(sujets_par_critere["categorie_socio_pro"].keys()))
                        
                        sujet_du_mentorat = random.choice(sujets_par_critere["sexe"][sexe] +
                                                          sujets_par_critere["handicap"][handicap] +
                                                          sujets_par_critere["niveau_professionnel"][niveau_professionnel] +
                                                          sujets_par_critere["categorie_socio_pro"][categorie_socio_pro])
                        data.append((id_mentorat, id_utilisateur_mentor, id_utilisateur_mentoret, sujet_du_mentorat))

                        if len(data) == 5000:
                            cursor.executemany(insert_query, data)
                            connection.commit()
                            data = []
                    if data:
                        cursor.executemany(insert_query, data)
                        connection.commit()

        except Error as e:
            print(f"Error: {e}")
    else:
        print("Table sujet is already populated")

def populate_mentor_sujet(n_entries: int, mentors: list, **kwargs) -> None:
    if if_table_is_empty("mentor_sujet", **kwargs):
        insert_query = """
        INSERT INTO mentor_sujet (id_mentor, id_mentorat)
        VALUES (%s, %s)"""
        
        try:
            with mysql.connector.connect(**kwargs) as connection:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT id_mentorat FROM mentorat")
                    mentorat_ids = [row[0] for row in cursor.fetchall()]

                    data = []
                    for _ in range(n_entries):
                        id_mentor = random.choice(mentors)
                        id_mentorat = random.choice(mentorat_ids)
                        data.append((id_mentor, id_mentorat))

                        if len(data) == 5000:
                            cursor.executemany(insert_query, data)
                            connection.commit()
                            data = []
                    if data:
                        cursor.executemany(insert_query, data)
                        connection.commit()

        except Error as e:
            print(f"Error: {e}")
    else:
        print("Table mentor_sujet is already populated")

def populate_calendrier(n_entries: int, fake: Faker, mentors: list, mentees: list, **kwargs) -> None:
    if if_table_is_empty("calendrier", **kwargs):
        insert_query = """
        INSERT INTO calendrier (id_utilisateur_mentor, id_utilisateur_mentoret, id_mentorat)
        VALUES (%s, %s, %s)"""
        
        try:
            with mysql.connector.connect(**kwargs) as connection:
                with connection.cursor() as cursor:
                    cursor.execute("SELECT id_mentorat FROM mentorat")
                    mentorat_ids = [row[0] for row in cursor.fetchall()]

                    if not mentorat_ids:
                        raise ValueError("The mentorat table is empty.")
                    
                    data = []
                    for _ in range(n_entries):
                        id_utilisateur_mentor = random.choice(mentors)
                        id_utilisateur_mentoret = random.choice(mentees)
                        id_mentorat = random.choice(mentorat_ids)
                        data.append((id_utilisateur_mentor, id_utilisateur_mentoret, id_mentorat))

                        if len(data) == 5000:
                            cursor.executemany(insert_query, data)
                            connection.commit()
                            data = []
                    if data:
                        cursor.executemany(insert_query, data)
                        connection.commit()

        except Error as e:
            print(f"Error: {e}")
    else:
        print("Table calendrier is already populated")

if __name__ == "__main__":

    load_dotenv()
    fake = Faker()

    my_sql_data = {
        "host": os.getenv("MY_SQL_HOST"),
        "user": os.getenv("MY_SQL_USER"),
        "password": os.getenv("MY_SQL_PWD"),
        "database": os.getenv("MY_SQL_DB"),
        "port": "3306",
    }
    
    mentors, mentees = populate_login_user_and_user_info(1000, fake, **my_sql_data)
    populate_sujet(300, fake, mentors, mentees, **my_sql_data)
    populate_mentor_sujet(500, mentors, **my_sql_data)
    populate_calendrier(600, fake, mentors, mentees, **my_sql_data)

print(check_connection(**my_sql_data))

#conn2 = mysql.connector.connect(host="localhost", user="Thoms", passwd="new_password", database="datacodersunited", port="3306")
#print(conn2.is_connected())
