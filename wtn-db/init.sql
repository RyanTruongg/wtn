
-- postgre systax
CREATE TABLE IF NOT EXISTS public."user"
(
    id varchar NOT NULL,
    deleted boolean DEFAULT false,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.course
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    instructor_id varchar NOT NULL,
    name varchar,
    schedule varchar,
    deleted boolean DEFAULT false,
    CONSTRAINT course_pkey PRIMARY KEY (id),
    CONSTRAINT course_instructor_id_fkey FOREIGN KEY (instructor_id)
        REFERENCES public."user" (id)
);

CREATE TABLE IF NOT EXISTS public.user_course
(
    user_id varchar,
    course_id UUID,

    CONSTRAINT user_course_pkey PRIMARY KEY (user_id, course_id),
    CONSTRAINT user_course_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.course (id),
    CONSTRAINT user_course_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (id)
);

CREATE TABLE IF NOT EXISTS public.exam
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name varchar,
    course_id UUID,
    start_time timestamp without time zone,
    duration integer,
    end_time timestamp without time zone,
    deleted boolean DEFAULT false,
    CONSTRAINT exam_pkey PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS public.subject
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    name varchar NOT NULL,
    description varchar,
    brief varchar,
    deleted boolean DEFAULT false,
    CONSTRAINT subject_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.question
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL,
    content varchar NOT NULL,
    deleted boolean DEFAULT false,
    CONSTRAINT question_pkey PRIMARY KEY (id),
    CONSTRAINT question_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES public.subject (id)
);

CREATE TABLE IF NOT EXISTS public.question_option
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    question_id UUID,
    content varchar NOT NULL,
    status boolean NOT NULL,
    CONSTRAINT question_option_pkey PRIMARY KEY (id),
    CONSTRAINT question_option_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question (id)
);

CREATE TABLE IF NOT EXISTS public.exam_question
(
    exam_id UUID,
    question_id UUID,
    score double precision,

    CONSTRAINT exam_question_pkey PRIMARY KEY (exam_id, question_id),
    CONSTRAINT exam_question_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exam (id),
    CONSTRAINT exam_question_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question (id)
);

CREATE TABLE IF NOT EXISTS public.exam_attempt
(
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    exam_id UUID NOT NULL,
    user_id varchar NOT NULL,
    start_time timestamp without time zone,
  
    submitted boolean NOT NULL,
    CONSTRAINT exam_attempt_pkey PRIMARY KEY (id),
    CONSTRAINT exam_attempt_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES public.exam (id),
    CONSTRAINT exam_attempt_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (id)
);

CREATE TABLE IF NOT EXISTS public.exam_answer
(
    attempt_id UUID NOT NULL,
    question_id UUID NOT NULL,
    answer UUID,
    CONSTRAINT exam_answer_attempt_id_fkey FOREIGN KEY (attempt_id) REFERENCES public.exam_attempt (id),
    CONSTRAINT exam_answer_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.question (id),
    CONSTRAINT exam_answer_pkey PRIMARY KEY (attempt_id, question_id)
);
