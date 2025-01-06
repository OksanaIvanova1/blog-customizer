import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
    ArticleStateType,
    backgroundColors,
    contentWidthArr,
    defaultArticleState,
    fontColors,
    fontFamilyOptions,
    fontSizeOptions,
    OptionType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
    currentArticleState: ArticleStateType;
    setCurrentArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
    currentArticleState,
    setCurrentArticleState,
}: ArticleParamsFormProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [selectArticleState, setSelectArticleState] =
        useState<ArticleStateType>(currentArticleState);

    const containerRef = useRef<HTMLDivElement>(null);

    useOutsideClickClose({
        isOpen: isMenuOpen,
        rootRef: containerRef,
        onChange: setIsMenuOpen,
    });

    const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
        setSelectArticleState({ ...selectArticleState, [key]: value });
    };

    return (
        <>
            <ArrowButton
                isOpen={isMenuOpen}
                onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                }}
            />
            <aside
                ref={containerRef}
                className={clsx(styles.container, isMenuOpen && styles.container_open)}>
                <form
                    className={styles.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        setCurrentArticleState(selectArticleState);
                    }}
                    onReset={(e) => {
                        e.preventDefault();
                        setSelectArticleState(defaultArticleState);
                        setCurrentArticleState(defaultArticleState);
                    }}>
                    <Text uppercase weight={800} size={31}>
                        Задайте параметры
                    </Text>
                    <Select
                        selected={selectArticleState.fontFamilyOption}
                        options={fontFamilyOptions}
                        onChange={(option) => handleChange('fontFamilyOption', option)}
                        title='Шрифт'
                    />
                    <RadioGroup
                        selected={selectArticleState.fontSizeOption}
                        options={fontSizeOptions}
                        onChange={(option) => handleChange('fontSizeOption', option)}
                        title='Размер шрифта'
                        name='fontSize'
                    />
                    <Select
                        selected={selectArticleState.fontColor}
                        options={fontColors}
                        onChange={(option) => handleChange('fontColor', option)}
                        title='Цвет шрифта'
                    />
                    <Separator />
                    <Select
                        selected={selectArticleState.backgroundColor}
                        options={backgroundColors}
                        onChange={(option) => handleChange('backgroundColor', option)}
                        title='Цвет фона'
                    />
                    <Select
                        selected={selectArticleState.contentWidth}
                        options={contentWidthArr}
                        onChange={(option) => handleChange('contentWidth', option)}
                        title='Ширина контента'
                    />
                    <div className={styles.bottomContainer}>
                        <Button title='Сбросить' htmlType='reset' type='clear' />
                        <Button title='Применить' htmlType='submit' type='apply' />
                    </div>
                </form>
            </aside>
        </>
    );
};
